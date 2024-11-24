
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor
import joblib


file_path = 'travel_budget_data.csv'
data = pd.read_csv(file_path)


data = data.dropna()  


data.columns = data.columns.str.strip()


data['From_Place'] = 'Origin_City'


categorical_features = ['From_Place', 'Destination', 'Travel_Mode', 'Accommodation_Type', 'Food_Preference', 'Activity', 'Purpose', 'Season', 'Month']
numerical_features = [
    'Group_Size', 'Distance_in_km', 'Cost_Transportation', 
    'Cost_Accommodation', 'Cost_Food', 'Cost_Activities'
]


encoder = OneHotEncoder(sparse_output=False, drop='first')  
encoded_categorical = pd.DataFrame(encoder.fit_transform(data[categorical_features]), 
                                    columns=encoder.get_feature_names_out(categorical_features))


scaler = StandardScaler()
scaled_numerical = pd.DataFrame(scaler.fit_transform(data[numerical_features]), 
                                columns=numerical_features)


processed_data = pd.concat([scaled_numerical, encoded_categorical], axis=1)


processed_data['Budget'] = data['Budget'].reset_index(drop=True)


X = processed_data.drop('Budget', axis=1)
y = processed_data['Budget']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training Set: {X_train.shape}, Test Set: {X_test.shape}")


xgb = XGBRegressor(objective='reg:squarederror', random_state=42)


param_dist = {
    'n_estimators': [100, 150, 200],  
    'max_depth': [3, 5, 7],  
    'learning_rate': [0.01, 0.05, 0.1],  
    'subsample': [0.7, 0.8, 0.9],  
    'colsample_bytree': [0.8, 1.0],  
    'gamma': [0, 0.05, 0.1]  
}


random_search = RandomizedSearchCV(estimator=xgb, param_distributions=param_dist, n_iter=50, scoring='neg_mean_absolute_error', cv=5, verbose=1, n_jobs=-1, random_state=42)


random_search.fit(X_train, y_train)


best_xgb_model = random_search.best_estimator_


y_pred_xgb = best_xgb_model.predict(X_test)


mae_xgb = mean_absolute_error(y_test, y_pred_xgb)
rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred_xgb))
r2_xgb = r2_score(y_test, y_pred_xgb)

print(f"Best Parameters: {random_search.best_params_}")
print(f"Mean Absolute Error (MAE): {mae_xgb}")
print(f"Root Mean Squared Error (RMSE): {rmse_xgb}")
print(f"R² Score: {r2_xgb}")


model_path = 'xgboost_travel_budget_predictor.pkl'
joblib.dump(best_xgb_model, model_path)
print(f"Model saved at: {model_path}")
joblib.dump(encoder, 'encoder.pkl')
joblib.dump(scaler, 'scaler.pkl')
