# SmartPlatform

## Overview

**SmartPlatform** é uma plataforma backend moderna construída com **.NET** e projetada para suportar **sistemas distribuídos, orientados a eventos e altamente escaláveis**.

A plataforma segue princípios de:

* **Domain-Driven Design (DDD)**
* **Clean Architecture**
* **Event-Driven Architecture**

O objetivo é criar uma base sólida para aplicações que exigem:

* alta **escalabilidade**
* **baixo acoplamento**
* **processamento assíncrono**
* **observabilidade de eventos**
* integração com **Inteligência Artificial**

---

# Principais Características

A plataforma inclui:

* API REST principal
* Worker Service para processamento assíncrono
* Sistema de **Domain Events**
* **Event Store** para rastreamento de eventos
* **Outbox Pattern** para integração confiável entre serviços
* **Timeline de eventos do sistema**
* Módulo dedicado para **Inteligência Artificial**

---

# Arquitetura

A solução é organizada em múltiplos projetos com responsabilidades bem definidas.

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

---

# Camadas da Aplicação

## SmartPlatform.Api

Camada de **apresentação da aplicação**.

Responsável por:

* Expor endpoints REST
* Configurar middlewares
* Gerenciar autenticação e autorização
* Configuração de dependências
* Inicialização da aplicação

Tecnologia principal:

* ASP.NET Core

---

## SmartPlatform.Application

Camada responsável pelos **casos de uso da aplicação**.

Contém:

* Commands
* Queries
* DTOs
* Serviços de aplicação
* Interfaces de repositórios

Essa camada **não possui dependência da infraestrutura**.

---

## SmartPlatform.Domain

O **núcleo do sistema**.

Contém:

* Entidades de domínio
* Value Objects
* Regras de negócio
* Domain Events
* Aggregate Roots

Essa camada **não possui dependências externas**.

---

## SmartPlatform.Infrastructure

Camada responsável pelos **detalhes técnicos da aplicação**.

Inclui:

* Implementação de repositórios
* Acesso ao banco de dados
* Configuração do Entity Framework Core
* Interceptadores do EF Core
* Event Store
* Outbox Pattern
* Timeline de eventos do sistema
* Integrações externas

Tecnologias principais:

* Entity Framework Core
* PostgreSQL
* Dapper

---

## SmartPlatform.AI

Módulo dedicado a **funcionalidades de Inteligência Artificial**.

Pode incluir:

* Integração com APIs de IA
* Processamento de linguagem natural
* Sistemas de recomendação
* Análise de dados

---

## SmartPlatform.Worker

Serviço responsável por **processamento em segundo plano**.

Responsabilidades:

* Processamento de mensagens da Outbox
* Integração com filas ou event bus
* Processamentos assíncronos
* Jobs de longa duração

---

## SmartPlatform.Shared

Projeto contendo **componentes reutilizáveis**.

Inclui:

* Helpers
* Extensions
* Objetos utilitários
* Constantes globais

---

# Event-Driven Architecture

A plataforma utiliza **Domain Events** para desacoplar regras de negócio e permitir evolução para arquiteturas distribuídas.

Fluxo simplificado:

```
Domain Entity
     │
AddDomainEvent()
     │
DbContext.SaveChanges()
     │
EF Core SaveChangesInterceptor
     │
 ├── Event Store
 ├── Outbox Messages
 └── System Timeline
```

---

# Event Store

Todos os eventos de domínio podem ser armazenados em uma tabela de **Event Store**, permitindo:

* auditoria completa
* rastreamento de operações
* replay de eventos
* análise histórica do sistema

---

# Outbox Pattern

Para garantir **consistência entre banco de dados e event bus**, o sistema utiliza o **Outbox Pattern**.

Fluxo:

```
Domain Event
     │
Persistido na Outbox
     │
Worker Service
     │
Publicação em Event Bus
```

Isso evita problemas clássicos de:

* mensagens perdidas
* inconsistência entre serviços

---

# System Timeline

O SmartPlatform mantém uma **timeline de eventos do sistema**, permitindo visualizar cronologicamente o que acontece na aplicação.

Exemplo:

```
UserRegistered
OrderCreated
PaymentApproved
AIRecommendationGenerated
```

Essa timeline pode ser utilizada para:

* observabilidade
* auditoria
* dashboards operacionais

---

# Tecnologias Utilizadas

* **.NET 10**
* **ASP.NET Core**
* **Entity Framework Core**
* **PostgreSQL**
* **Dapper**

---

# Começando

## Pré-requisitos

* .NET 10 SDK
* Docker (opcional)
* PostgreSQL

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

Configure a string de conexão em:

```
SmartPlatform.Api/appsettings.json
```

Exemplo:

```
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=SmartPlatformDb;Username=postgres;Password=postgrespw"
}
```

---

# Migrações do Banco

```
dotnet ef migrations add InitialCreate --project SmartPlatform.Infrastructure
```

Aplicar:

```
dotnet ef database update --project SmartPlatform.Infrastructure
```

---

# Executando a API

```
dotnet run --project SmartPlatform.Api
```

A API estará disponível em:

```
https://localhost:5001
```

---

# Executando o Worker

```
dotnet run --project SmartPlatform.Worker
```

---

# Roadmap

Funcionalidades planejadas:

* Event Bus (Kafka / RabbitMQ)
* Observabilidade com OpenTelemetry
* Dashboard de eventos do sistema
* Integração avançada com IA
* Sistema de automação baseado em eventos

---

# Licença

Este projeto está licenciado sob a **MIT License**.

---

💡 **Minha recomendação técnica para você**

Esse README já está **no nível de projetos open-source profissionais**.

Mas existe **uma melhoria que faz muita diferença visual em repositórios**:

Adicionar um **diagrama de arquitetura** logo no topo.

Algo assim:

```
Client
   │
   ▼
API
   │
Application Layer
   │
Domain
   │
Infrastructure
   │
PostgreSQL
   │
Outbox → Worker → Event Bus
```

Se quiser, eu também posso te montar **um diagrama de arquitetura bem bonito (estilo arquitetura da Netflix/AWS)** para colocar no README do SmartPlatform. Isso valoriza muito o projeto.
