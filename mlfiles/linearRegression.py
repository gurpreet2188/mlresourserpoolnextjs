from sklearn.linear_model import LinearRegression
# from sklearn.impute import SimpleImputer
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error
# from sklearn.datasets import fetch_openml
from training import Regression


class LR(LinearRegression):
    def __init__(self, X, y, fit_intercept=True, imputer_strategy='mean'):
        super().__init__(fit_intercept=fit_intercept)
        self.X = X
        self.y = y
        self.imputer_strategy = imputer_strategy

    def train(self, test_size=0.2):
        regress = Regression(self.X, self.y, self.fit, self.predict, imputer_strategy=self.imputer_strategy,
                             split=test_size)
        return regress.train()

# boston = fetch_openml(data_id='506', as_frame=True)
# X = boston.data
# y = boston.target
# lr = LR(X, y)
# print("boston", lr.train())
