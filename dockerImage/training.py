from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.model_selection import KFold, cross_val_score , cross_val_predict

class Regression:
    def __init__(self, X, y, fit, predict, split=0.2, imputer_strategy='mean'):
        self.X = X
        self.y = y
        self.fit = fit
        self.predict = predict
        self.split = split
        self.imputer_strategy = imputer_strategy

    def train(self):
        imputer = SimpleImputer(strategy=self.imputer_strategy)
        self.X = imputer.fit_transform(self.X)
        X_train, X_test, y_train, y_test = train_test_split(self.X, self.y, test_size=self.split)
        scaler = StandardScaler(with_mean=False)
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)
        self.fit(X_train, y_train.values.ravel())
        predictions = self.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        del X_train, X_test, y_train, y_test
        return {'cm': "", 'accuracy': mse}


class Classify:
    def __init__(self, X, y, fit, predict, split=0.2, cv=3):
        self.X = X
        self.y = y
        self.fit = fit
        self.predict = predict
        self.split = split
        self.n_splits = cv

    def train(self):
        X_train, X_test, y_train, y_test = train_test_split(self.X, self.y, test_size=self.split)
        print(X_train.shape[1])
        model = self.fit(X_train, y_train.values.ravel())
        cv = KFold(n_splits=self.n_splits, random_state=1, shuffle=True)
        accuracy = cross_val_score(model,self.X, self.y, cv=cv, scoring='accuracy').mean()
        y_pred = cross_val_predict(model, self.X, self.y, cv=cv)
        cm = confusion_matrix(self.y, y_pred)
        cm = cm.tolist()
        print(accuracy, cm)
        return {'cm': cm, 'accuracy': accuracy * 100}
