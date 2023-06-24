from celery import Celery
import os, time
from knn import KNNClassifier, KNNRegressor
from linearRegression import LR
from decisionTree import DTC, DTR
from random_forest import RFC, RFR
from preprocessing import Preprocessing

celery = Celery('tasks', broker="redis://redis:6379/0", backend="redis://redis:6379/0")


# app = Celery(__name__)
# app.conf.broker_url = "amqp://localhost"
# app.conf.result_backend = "amqp://localhost"


@celery.task(name="train")
def train(mlConfig):
    preprocess = Preprocessing('./cleaned/rowColumnFilter.csv', targetColumn=mlConfig['target_column'])
    X, y = preprocess.prepare_data()

    # mlModel = KNNClassifier(X, y, weights=mlConfig['weights'], leaf_size=mlConfig['leaf_size'])
    mlConfig['test_size'] = float(mlConfig['test_size'])
    print(mlConfig)
    if (mlConfig['type'] == 'knn_regress'):

        mlConfig['leaf_size'] = int(mlConfig['leaf_size'])
        mlConfig['n_neighbors'] = int(mlConfig['n_neighbors'])
        mlModel = KNNRegressor(X, y, weights=mlConfig['weights'], leaf_size=mlConfig['leaf_size'],
                               imputer_strategy=mlConfig['imputer_strategy'], n_neighbors=mlConfig['n_neighbors'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'knn_classify'):
        mlConfig['leaf_size'] = int(mlConfig['leaf_size'])
        mlConfig['n_neighbors'] = int(mlConfig['n_neighbors'])
        mlModel = KNNClassifier(X, y, weights=mlConfig['weights'], leaf_size=mlConfig['leaf_size'], n_neighbors=mlConfig['n_neighbors'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'linear_regress'):
        mlModel = LR(X, y, fit_intercept=mlConfig['fit_intercept'], imputer_strategy=mlConfig['imputer_strategy'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'dt_classify'):
        if (mlConfig['random_state'] != None):
            mlConfig['random_state'] = int(mlConfig['random_state'])

        if (mlConfig['max_depth'] != None):
            mlConfig['max_depth'] = int(mlConfig['max_depth'])

        mlConfig['min_samples_leaf'] = int(mlConfig['min_samples_leaf'])
        mlConfig['min_samples_split'] = int(mlConfig['min_samples_split'])

        mlModel = DTC(X, y, splitter=mlConfig['splitter'], random_state=mlConfig['random_state'],
                      max_depth=mlConfig['max_depth'], min_samples_leaf=mlConfig['min_samples_leaf'],
                      min_samples_split=mlConfig['min_samples_split'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'dt_regress'):

        if (mlConfig['random_state'] != None):
            mlConfig['random_state'] = int(mlConfig['random_state'])

        if (mlConfig['max_depth'] != None):
            mlConfig['max_depth'] = int(mlConfig['max_depth'])

        mlConfig['min_samples_leaf'] = int(mlConfig['min_samples_leaf'])
        mlConfig['min_samples_split'] = int(mlConfig['min_samples_split'])

        mlModel = DTR(X, y, splitter=mlConfig['splitter'], random_state=mlConfig['random_state'],
                      max_depth=mlConfig['max_depth'], min_samples_leaf=mlConfig['min_samples_leaf'],
                      min_samples_split=mlConfig['min_samples_split'], imputer_strategy=mlConfig['imputer_strategy'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'rf_classify'):
        if (mlConfig['random_state'] != None):
            mlConfig['random_state'] = int(mlConfig['random_state'])

        if (mlConfig['max_depth'] != None):
            mlConfig['max_depth'] = int(mlConfig['max_depth'])
        mlConfig['n_estimators'] = int(mlConfig['n_estimators'])
        mlConfig['min_samples_split'] = int(mlConfig['min_samples_split'])
        mlConfig['min_samples_leaf'] = int(mlConfig['min_samples_leaf'])

        mlModel = RFC(X, y, n_estimators=mlConfig['n_estimators'], max_depth=mlConfig['max_depth'],
                      min_samples_split=mlConfig['min_samples_split'], min_samples_leaf=mlConfig['min_samples_leaf'],
                      random_state=mlConfig['random_state'])
        return mlModel.train(test_size=mlConfig['test_size'])

    elif (mlConfig['type'] == 'rf_regress'):
        if (mlConfig['random_state'] != None):
            mlConfig['random_state'] = int(mlConfig['random_state'])

        if (mlConfig['max_depth'] != None):
            mlConfig['max_depth'] = int(mlConfig['max_depth'])

        mlConfig['n_estimators'] = int(mlConfig['n_estimators'])
        mlConfig['min_samples_split'] = int(mlConfig['min_samples_split'])
        mlConfig['min_samples_leaf'] = int(mlConfig['min_samples_leaf'])

        mlModel = RFR(X, y, n_estimators=mlConfig['n_estimators'], max_depth=mlConfig['max_depth'],
                      min_samples_split=mlConfig['min_samples_split'], min_samples_leaf=mlConfig['min_samples_leaf'],
                      random_state=mlConfig['random_state'], imputer_strategy=mlConfig['imputer_strategy'])
        return mlModel.train(test_size=mlConfig['test_size'])
