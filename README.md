# CADASTRO DE USUÁRIO COM VALIDAÇÃO DE LOGIN E TOKEN PARA API 

## DEPENDÊNCIAS UTILIZADAS:

#### Config - Utilizado para gerênciar variáveis de ambiente
#### Express - Utilizado para realizar requisições HTTP
#### http-status-codes - Utilizado para facilitar o reconhecimento do retorno http no código
#### pg - Driver para gerenciamento de banco de dados PostGreeSQL 
#### JsonWebToken - Utilizado para criação e validação de TOKENS


## ENDPOINTS - 

### Usuário -> 
#### GET /users 
#### GET /users/:uuid 
#### Post /users
#### Put /users/:uuid
#### Delete /users/:uuid

### Token 
#### POST /token
#### POST /token/validate

### Status 
#### GET / 
