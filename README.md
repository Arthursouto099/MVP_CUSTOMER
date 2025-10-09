🚗 API REST - Rotas GET (Customers e Services)

Documentação das rotas GET da API local de gerenciamento de clientes e serviços de um lava-rápido.
Ambiente de desenvolvimento local.

🌐 Base URL
http://localhost:3000/api/v1

🧑‍💼 GET /customer/all

Retorna todos os clientes cadastrados, incluindo seus serviços associados.

Endpoint
GET /customer/all

Exemplo de Resposta
```json
{
  "message": "Customers finded",
  "data": [
    {
      "id_customer": "c31e77df-713e-4596-a1c9-b199e31938ab",
      "name": "Arthur Santos Tavares Souto",
      "phone": "(47) 99999-8888",
      "email": "arthur.souto@example.com",
      "password": "senhaSegura123",
      "plate": "ABC1D23",
      "car_model": "Honda Civic EX 2020",
      "createdAt": "2025-10-09T00:26:02.569Z",
      "updatedAt": "2025-10-09T00:26:02.569Z",
      "services": [
        {
          "id_service": "65bac6c5-5ea0-4b18-99ac-ea0694ff6e67",
          "customer_id": "c31e77df-713e-4596-a1c9-b199e31938ab",
          "name": "Lavagem Completa Premium",
          "description": "Lavagem completa com cera, higienização interna, aspiração e pretinho nos pneus.",
          "service_type": "lava_carro",
          "price": "89.90000000000001",
          "status": "AGENDADO",
          "checkOutDate": null,
          "checkInDate": "2025-10-08T13:45:00.000Z",
          "updatedAt": "2025-10-09T00:26:18.065Z",
          "isPaid": false
        }
      ]
    }
  ]
}
````

🧾 GET /services/all

Retorna todos os serviços cadastrados, incluindo os dados do cliente vinculado a cada serviço.

Endpoint
GET /services/all

Exemplo de Resposta
````json
{
  "message": "Services finded",
  "data": [
    {
      "id_service": "65bac6c5-5ea0-4b18-99ac-ea0694ff6e67",
      "customer_id": "c31e77df-713e-4596-a1c9-b199e31938ab",
      "name": "Lavagem Completa Premium",
      "description": "Lavagem completa com cera, higienização interna, aspiração e pretinho nos pneus.",
      "service_type": "lava_carro",
      "price": "89.90000000000001",
      "status": "AGENDADO",
      "checkOutDate": null,
      "checkInDate": "2025-10-08T13:45:00.000Z",
      "updatedAt": "2025-10-09T00:26:18.065Z",
      "isPaid": false,
      "customer": {
        "id_customer": "c31e77df-713e-4596-a1c9-b199e31938ab",
        "name": "Arthur Santos Tavares Souto",
        "phone": "(47) 99999-8888",
        "email": "arthurtavaressouto@example.com",
        "password": "senhaSegura123",
        "plate": "ABC1D23",
        "car_model": "Honda Civic EX 2020",
        "createdAt": "2025-10-09T00:26:02.569Z",
        "updatedAt": "2025-10-09T00:51:08.141Z"
      }
    }
  ]
}

````
