# Rent Scooter API

這是一個基於 NestJS 的電動車租賃系統 API。本系統提供用戶管理、電動車管理和租賃記錄管理等功能。


## 安裝和運行

### 前置要求

- Node.js (v14+)
- npm 或 yarn
- PostgreSQL

### 安裝步驟

1. 克隆儲存庫：
   ```
   git clone https://github.com/parkerro/rent-scooter-api.git
   cd rent-scooter-api
   ```

2. 安裝依賴：
   ```
   npm install
   ```

3. 環境配置：
   - 複製 `.env.sample` 到 `.env`：
     ```
     cp .env.sample .env
     ```
   - 編輯 `.env` 文件，填入您的環境配置

4. 數據庫初始化：
   - 數據庫 schema 位於 `./src/migration/init.sql`
   - 運行以下命令初始化數據庫：
     ```
     psql -U your_username -d your_database_name -f ./src/migration/init.sql
     ```

5. 運行應用：
   ```
   npm run start:dev
   ```

現在，API 服務應該運行在 `http://localhost:3000`（或您在 .env 文件中指定的端口）。

## API 文檔

啟動應用後，您可以訪問 GraphQL Playground 來探索和測試 API：

```
http://localhost:3000/graphql
```

## 測試

運行單元測試：
```
npm run test
```
