from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from training import Classify, Regression
# from sklearn.datasets import load_iris


class RFR(RandomForestRegressor):
    def __init__(self, X, y, n_estimators=100, max_depth=None, imputer_strategy='mean', min_samples_split=2,
                 min_samples_leaf=1, random_state=None):
        super().__init__(n_estimators=n_estimators, max_depth=max_depth,
                         min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf,
                         random_state=random_state)
        self.X = X
        self.y = y
        self.imputer_strategy = imputer_strategy

    def train(self, test_size=0.2):
        regress = Regression(self.X, self.y, self.fit, self.predict, split=test_size,
                             imputer_strategy=self.imputer_strategy)
        return regress.train()


class RFC(RandomForestClassifier):
    def __init__(self, X, y, n_estimators=100, max_depth=None, min_samples_split=2,
                 min_samples_leaf=1, random_state=None):
        super().__init__(n_estimators=n_estimators, max_depth=max_depth,
                         min_samples_split=min_samples_split, min_samples_leaf=min_samples_leaf,
                         random_state=random_state, criterion='entropy')
        self.X = X
        self.y = y

    def train(self, test_size=0.2):
        classify = Classify(self.X, self.y, self.fit, self.predict, test_size)
        return classify.train()


# iris = load_iris()
# X = iris.data
# y = iris.target
# dtc = RFC(X, y, random_state=100)
# print("iris", dtc.train(test_size=0.3))
