# SmartPlatform

## Descrição

O **SmartPlatform** é uma plataforma backend moderna e escalável desenvolvida com **.NET**, projetada para suportar aplicações distribuídas e de alta performance.

A arquitetura segue princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**, separando responsabilidades em camadas bem definidas para garantir:

* Alta **manutenibilidade**
* **Escalabilidade**
* **Testabilidade**
* Baixo **acoplamento**

A plataforma inclui:

* Uma **API REST principal**
* Um **Worker Service** para processamento assíncrono
* Um módulo dedicado para **Inteligência Artificial**

---

# Arquitetura

A solução está organizada em múltiplos projetos, cada um com responsabilidades bem definidas.

```
SmartPlatform
│
├── SmartPlatform.Api
├── SmartPlatform.Worker
│
├── SmartPlatform.Application
├── SmartPlatform.Domain
│
├── SmartPlatform.Infrastructure
│
├── SmartPlatform.AI
│
└── SmartPlatform.Shared
```

### SmartPlatform.Api

Camada de apresentação da aplicação.

Responsável por:

* Expor endpoints REST
* Configurar middlewares
* Gerenciar autenticação e autorização
* Configuração da aplicação

Tecnologia principal:

* ASP.NET Core

---

### SmartPlatform.Application

Camada responsável pelos **casos de uso da aplicação**.

Contém:

* Interfaces de repositórios
* Serviços de aplicação
* DTOs
* Regras de orquestração de negócios

Essa camada **não depende da infraestrutura**.

---

### SmartPlatform.Domain

O núcleo da aplicação.

Contém:

* Entidades de domínio
* Value Objects
* Regras de negócio fundamentais
* Interfaces de repositórios

Essa camada **não possui dependências externas**.

---

### SmartPlatform.Infrastructure

Implementa os detalhes técnicos necessários para executar a aplicação.

Inclui:

* Implementações de repositórios
* Integrações externas
* Acesso a banco de dados
* Configuração de ORM

Tecnologias principais:

* Entity Framework Core
* Dapper

---

### SmartPlatform.AI

Projeto dedicado a funcionalidades de **Inteligência Artificial**.

Pode incluir:

* Integração com APIs de IA
* Serviços de análise de dados
* Modelos de machine learning
* Processamento de linguagem natural (NLP)

---

### SmartPlatform.Worker

Serviço de **processamento em segundo plano** baseado em Worker Service.

Responsável por:

* Processamento assíncrono
* Filas de tarefas
* Integrações externas
* Processamentos pesados

---

### SmartPlatform.Shared

Projeto para **código reutilizável entre as camadas**.

Pode incluir:

* Helpers
* Extensions
* Objetos utilitários
* Constantes globais

---

# Tecnologias Utilizadas

* **.NET 10**
* **ASP.NET Core**
* **Entity Framework Core**
* **Dapper**
* **SQL Server**

---

# Começando

## Pré-requisitos

* [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
* [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)

---

# Instalação

Clone o repositório:

```
git clone <URL_DO_REPOSITORIO>
cd SmartPlatform
```

Restaure as dependências:

```
dotnet restore
```

---

# Configuração

Configure a string de conexão no arquivo:

```
SmartPlatform.Api/appsettings.json
```

e

```
SmartPlatform.Worker/appsettings.json
```

Exemplo:

```
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=SmartPlatformDb;User Id=SEU_USUARIO;Password=SUA_SENHA;"
}
```

---

# Migração do Banco de Dados

Se estiver utilizando **Entity Framework Core**, execute:

```
dotnet ef database update --project SmartPlatform.Infrastructure
```

---

# Executando a Aplicação

## Executar a API

```
dotnet run --project SmartPlatform.Api
```

A API estará disponível em:

```
https://localhost:5001
```

ou

```
http://localhost:5000
```

---

## Executar o Worker

```
dotnet run --project SmartPlatform.Worker
```

---

# Contribuição

Pull requests são bem-vindos.

Para mudanças maiores, abra uma **issue** primeiro para discutirmos a proposta.

---

# Licença

Este projeto está licenciado sob a licença **MIT**.
