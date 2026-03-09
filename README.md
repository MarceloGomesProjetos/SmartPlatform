# SmartPlatform - Boilerplate de Arquitetura Limpa para .NET

![.NET](httpshttps://img.shields.io/badge/.NET-10-blueviolet)
![Arquitetura](https://img.shields.io/badge/Arquitetura-Limpa%20%7C%20DDD-informational)
![Padrões](https://img.shields.io/badge/Padrões-CQRS%20%7C%20Event--Driven-blue)
![Licença](https://img.shields.io/badge/Licença-MIT-green)

---

## 🚀 Visão Geral

**SmartPlatform** não é uma aplicação final, mas sim um **boilerplate robusto e opinativo** para a construção de sistemas .NET modernos, escaláveis e de fácil manutenção. Ele fornece uma fundação arquitetural sólida baseada em princípios de **Clean Architecture**, **Domain-Driven Design (DDD)** e **Arquitetura Orientada a Eventos (EDA)**.

O objetivo deste projeto é acelerar o desenvolvimento de novas aplicações, oferecendo uma estrutura pré-configurada com padrões de design e componentes de infraestrutura que resolvem desafios comuns de sistemas distribuídos.

---

## 🏛️ Princípios de Arquitetura

A plataforma é construída sobre três pilares principais:

1.  **Clean Architecture**: A separação de responsabilidades é rigorosa. O código é organizado em camadas (Domínio, Aplicação, Infraestrutura, Apresentação), garantindo baixo acoplamento e alta testabilidade. O Domínio não depende de nenhum detalhe de implementação.

2.  **Domain-Driven Design (DDD)**: O coração do software é o seu domínio. O projeto utiliza conceitos de DDD como Entidades, Agregados, Objetos de Valor e Eventos de Domínio para modelar regras de negócio complexas de forma clara e concisa.

3.  **Arquitetura Orientada a Eventos (EDA)**: A comunicação entre diferentes partes do sistema (e futuros microsserviços) é feita através de eventos. Isso promove o desacoplamento e permite a construção de fluxos de trabalho assíncronos, resilientes e escaláveis.

---

## ✨ Features Arquiteturais Implementadas

Este boilerplate vem com várias features de arquitetura prontas para usar:

*   **Estrutura de Projetos (Clean Architecture)**: Solução organizada em camadas `Domain`, `Application`, `Infrastructure` e `Api`.
*   **CQRS (Command and Query Responsibility Segregation)**: Separação clara entre operações de escrita (Commands) e leitura (Queries), facilitado pelo uso do **MediatR**.
*   **Eventos de Domínio**: Permite que o núcleo do negócio emita eventos quando estados importantes mudam.
*   **Event Store**: Um interceptador do Entity Framework Core captura automaticamente todos os Eventos de Domínio e os persiste em uma tabela de `EventStore`, criando um log de auditoria completo e imutável.
*   **Outbox Pattern**: Garante a entrega confiável de mensagens. Eventos são salvos atomicamente na mesma transação do banco de dados (em uma tabela `OutboxMessage`) e processados em segundo plano por um Worker Service, evitando inconsistências entre o estado da aplicação e o barramento de eventos.
*   **System Timeline**: Além do Event Store, uma `Timeline` simplificada registra os eventos de negócio, facilitando a observabilidade e o rastreamento do fluxo de operações.
*   **Worker Service**: Um serviço de background (`SmartPlatform.Worker`) pré-configurado para processar a tabela Outbox e executar outras tarefas assíncronas.
*   **Abstração para IA**: Um módulo `SmartPlatform.AI` com uma interface `IAiService` simples, facilitando a integração de funcionalidades de Inteligência Artificial de forma desacoplada.
*   **UI Frontend (Boilerplate)**: Inclui um projeto base em `React` com `TypeScript` e `Vite` na pasta `ui`, pronto para ser desenvolvido.

---

## 📂 Estrutura dos Projetos

A solução é organizada em múltiplos projetos, cada um com uma responsabilidade clara, seguindo os princípios da Clean Architecture.

```
SmartPlatform/
│
├── src/
│   ├── SmartPlatform.Api           # Camada de Apresentação (Minimal APIs)
│   ├── SmartPlatform.Worker        # Processamento em background (Outbox, etc.)
│   │
│   ├── SmartPlatform.Application   # Lógica da aplicação (Commands, Queries, Casos de Uso)
│   ├── SmartPlatform.Domain        # O coração do negócio (Entidades, Eventos de Domínio)
│   │
│   ├── SmartPlatform.Infrastructure  # Detalhes de implementação (EF Core, Repositórios)
│   │
│   ├── SmartPlatform.AI            # Abstrações para serviços de IA
│   └── SmartPlatform.Shared        # Código compartilhado (Helpers, Extensões)
│
└── ui/
    └── SmartPlatform.console       # Aplicação Frontend (React + Vite)
```

---

## ⚙️ Fluxo de Eventos: Como Funciona

O fluxo orientado a eventos é o principal diferencial deste boilerplate.

1.  **Geração do Evento**: Uma entidade de domínio (ex: `User`) cria um evento (`UserRegisteredEvent`) e o adiciona à sua lista de eventos de domínio.
    ```csharp
    // Dentro da entidade User
    var user = new User { ... };
    user.AddDomainEvent(new UserRegisteredEvent(user.Id));
    ```
2.  **Salvamento e Interceptação**: Ao chamar `DbContext.SaveChanges()`, um interceptador do EF Core entra em ação antes da transação ser completada.
3.  **Persistência Atômica**: O interceptador insere os eventos em três lugares diferentes dentro da mesma transação do banco de dados:
    *   **`EventStore`**: Para auditoria e rastreabilidade.
    *   **`OutboxMessage`**: Para processamento assíncrono confiável.
    *   **`SystemTimeline`**: Para observabilidade simplificada.
4.  **Processamento pelo Worker**: O `SmartPlatform.Worker` periodicamente verifica a tabela `OutboxMessage` por novas mensagens.
5.  **Publicação**: Para cada mensagem, o Worker a processa e, eventualmente, a publicaria em um barramento de eventos como RabbitMQ ou Kafka (a implementação final do publicador fica a cargo do desenvolvedor).

Este mecanismo garante que, mesmo que o envio para o barramento de eventos falhe, a mensagem permanece na Outbox para ser reprocessada, garantindo **consistência eventual** em um sistema distribuído.

---

## 🛠️ Tecnologias

*   **Backend**: .NET 10 (configurado para a versão futura, compatível com .NET 8+)
*   **Framework API**: ASP.NET Core (usando Minimal APIs)
*   **ORM**: Entity Framework Core
*   **Banco de Dados**: PostgreSQL
*   **Comunicação Interna**: MediatR para implementação de CQRS
*   **Frontend**: React, Vite, TypeScript
*   **Containerização**: Docker (arquivos `Dockerfile` inclusos, `docker-compose.yml` como placeholder)

---

## 🏁 Começando

### Pré-requisitos

*   [.NET SDK](https://dotnet.microsoft.com/download) (versão 8 ou superior)
*   [Docker](https://www.docker.com/get-started)
*   Um cliente PostgreSQL (como DBeaver ou PgAdmin)

### 1. Configuração do Banco de Dados

Este projeto está configurado para usar PostgreSQL. A maneira mais fácil de começar é usando Docker.

```bash
# Execute um contêiner PostgreSQL
docker run --name smartplatform-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgrespw -p 5432:5432 -d postgres
```

### 2. Configuração da Aplicação

Clone o repositório e atualize a string de conexão no arquivo `appsettings.Development.json` do projeto `SmartPlatform.Api`.

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=SmartPlatformDb;Username=postgres;Password=postgrespw"
}
```

### 3. Aplicando as Migrações

Com o banco de dados em execução, aplique as migrações do EF Core para criar o schema.

```bash
# A partir da raiz do projeto
dotnet ef database update --project src/SmartPlatform.Infrastructure
```

### 4. Executando os Serviços

Você pode executar a API e o Worker em terminais separados:

```bash
# Terminal 1: Executando a API
dotnet run --project src/SmartPlatform.Api
```

```bash
# Terminal 2: Executando o Worker
dotnet run --project src/SmartPlatform.Worker
```

A API estará disponível em `http://localhost:5000` e `https://localhost:5001`.

### 5. Executando o Frontend

Navegue até a pasta da UI e instale as dependências.

```bash
cd ui/SmartPlatform.console
npm install
npm run dev
```

---

## 🗺️ Roadmap: Próximos Passos

Este boilerplate é a fundação. Aqui estão os próximos passos recomendados para construir sua aplicação:

*   **Implementar Endpoints na API**: Adicione `MapGet`, `MapPost`, etc., no `Program.cs` do projeto `Api` para expor suas funcionalidades.
*   **Completar os Commands e Queries**: Adicione propriedades aos DTOs dos comandos e implemente a lógica nos seus respectivos Handlers.
*   **Configurar o `docker-compose.yml`**: Adicione os serviços da API, Worker e o banco de dados para orquestrar a aplicação com um único comando.
*   **Integrar um Barramento de Eventos**: No Worker, adicione a lógica para publicar os eventos da Outbox em um sistema como **RabbitMQ** ou **Kafka**.
*   **Desenvolver a UI**: Construa os componentes React para interagir com a API.
*   **Adicionar Testes**: Escreva testes unitários para o domínio e aplicação, e testes de integração para a API.

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.