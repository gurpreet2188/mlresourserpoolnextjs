from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier
# from sklearn.metrics import accuracy_score, confusion_matrix
# from sklearn.model_selection import train_test_split
# from sklearn.impute import SimpleImputer
# from sklearn.metrics import mean_squared_error
from training import Classify, Regression


class KNNRegressor(KNeighborsRegressor):
    def __init__(self, X, y, weights='uniform', algorithm='auto', leaf_size=30,
                 imputer_strategy='mean', n_neighbors=5):
        super().__init__(weights=weights, algorithm=algorithm, leaf_size=leaf_size, n_neighbors=n_neighbors)
        self.X = X
        self.y = y
        self.imputer_strategy = imputer_strategy

    def train(self, test_size=0.2):
        regress = Regression(self.X, self.y, self.fit, self.predict, split=test_size,
                             imputer_strategy=self.imputer_strategy)
        return regress.train()


class KNNClassifier(KNeighborsClassifier):
    def __init__(self, X, y, weights='uniform', algorithm='auto', leaf_size=30, n_neighbors=5):
        super().__init__(weights=weights, algorithm=algorithm, leaf_size=leaf_size, n_neighbors=n_neighbors)
        self.X = X
        self.y = y


    def train(self, test_size=0.2):
        classify = Classify(self.X, self.y, self.fit, self.predict, split=test_size)
        return classify.train()

# iris = load_iris()
# X = iris.data
# y = iris.target
#
# knn = KNNClassifier(X, y)
# print("iris", knn.train())
#
# boston = fetch_openml(data_id='506', as_frame=True)
# X = boston.data
# y = boston.target
# knn = KNNRegressor(X, y)
# print("boston", knn.train())
