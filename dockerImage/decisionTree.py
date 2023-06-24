from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
# from sklearn.impute import SimpleImputer
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error

# from sklearn.metrics import accuracy_score, confusion_matrix
# from sklearn.datasets import load_iris
from training import Classify, Regression
from preprocessing import Preprocessing

class DTR(DecisionTreeRegressor):
    def __init__(self, X, y, splitter='best', max_depth=None, imputer_strategy='mean', min_samples_split=2,
                 min_samples_leaf=1,
                 random_state=None):
        super().__init__(max_depth=max_depth, min_samples_split=min_samples_split,
                         min_samples_leaf=min_samples_leaf, random_state=random_state, splitter=splitter)
        self.X = X
        self.y = y
        self.imputer_strategy = imputer_strategy

    def train(self, test_size=0.2):
        regress = Regression(self.X, self.y, self.fit, self.predict, split=test_size,
                             imputer_strategy=self.imputer_strategy)
        return regress.train()


class DTC(DecisionTreeClassifier):
    def __init__(self, X, y, splitter='best', max_depth=None, min_samples_split=2, min_samples_leaf=1,
                 random_state=None):
        super().__init__(max_depth=max_depth, min_samples_split=min_samples_split,
                         min_samples_leaf=min_samples_leaf, random_state=random_state, splitter=splitter)
        self.X = X
        self.y = y

    def train(self, test_size=0.2):
       
        classify = Classify(self.X, self.y, self.fit, self.predict, test_size)
        return classify.train()


# iris = load_iris()
# X = iris.data
# y = iris.target
# dtc = DTC(X, y, splitter='best', random_state=10)
# print("iris", dtc.train(test_size=0.3))


# preprocess = Preprocessing('./cleaned/rowColumnFilter.csv', targetColumn='RainTomorrow')
# X, y = preprocess.prepare_data()
# dtc = DTC(X,y)
# dtc.train(0.3)