# Esquema das coleções

Usei IDs simples em texto, como "hsp001", para facilitar a identificação e as referências. As datas aparecem como texto no JSON e como ISODate no script de inserção. Os valores estão em reais.

Abaixo está um exemplo de documento de cada coleção. O arquivo [documentos.json](../parte2-dados/documentos.json) contém todos os exemplos da atividade.

## hospedes

```json
{
  "_id": "hsp001",
  "nome": "Carlos Andrade",
  "email": "carlos@example.com",
  "telefone": "11900000001",
  "endereco": {
    "cidade": "São Paulo",
    "estado": "SP"
  },
  "preferencias": {
    "cama": "casal",
    "andar_alto": true
  }
}
```

## quartos

```json
{
  "_id": "qrt101",
  "numero": "101",
  "tipo": "standard",
  "categoria": "economico",
  "capacidade_max": 2,
  "preco_diaria": 250,
  "comodidades": [
    "wifi",
    "tv"
  ],
  "caracteristicas": {
    "vista": "jardim",
    "banheira": false
  }
}
```

## funcionarios

```json
{
  "_id": "fnc001",
  "nome": "Juliana Martins",
  "cargo": "recepcionista",
  "turno": {
    "entrada": "07:00",
    "saida": "15:00"
  }
}
```

## servicos

```json
{
  "_id": "svc001",
  "nome": "Café da manhã",
  "preco": 45,
  "unidade": "pessoa",
  "horario": {
    "inicio": "06:30",
    "fim": "10:30"
  }
}
```

## reservas

```json
{
  "_id": "rsv001",
  "hospede_id": "hsp001",
  "quarto_id": "qrt101",
  "hospede_snapshot": {
    "nome": "Carlos Andrade",
    "email": "carlos@example.com"
  },
  "quarto_snapshot": {
    "numero": "101",
    "tipo": "standard",
    "preco_diaria": 250
  },
  "data_checkin": "2025-04-10T00:00:00.000Z",
  "data_checkout": "2025-04-12T00:00:00.000Z",
  "num_noites": 2,
  "num_hospedes": 2,
  "valor_total": 500,
  "status": "concluida"
}
```

## hospedagens

```json
{
  "_id": "hpd001",
  "reserva_id": "rsv001",
  "hospede_id": "hsp001",
  "quarto_id": "qrt101",
  "checkin_real": "2025-04-10T14:00:00.000Z",
  "checkout_real": "2025-04-12T11:00:00.000Z",
  "status": "encerrada",
  "funcionario_checkin_id": "fnc001",
  "funcionario_checkout_id": "fnc002",
  "servicos_consumidos": [
    {
      "servico_id": "svc001",
      "nome": "Café da manhã",
      "quantidade": 1,
      "preco_unitario": 45,
      "total": 45,
      "data": "2025-04-11T08:00:00.000Z"
    }
  ],
  "total_diarias": 500,
  "total_servicos": 45,
  "total_geral": 545
}
```

## pagamentos

```json
{
  "_id": "pgt001",
  "hospedagem_id": "hpd001",
  "reserva_id": "rsv001",
  "hospede_id": "hsp001",
  "valor_total": 545,
  "status": "pago",
  "data_pagamento": "2025-04-12T10:50:00.000Z",
  "parcelas": [
    {
      "metodo": "pix",
      "valor": 545,
      "status": "aprovado"
    }
  ]
}
```

## feedbacks

```json
{
  "_id": "fdb001",
  "hospede_id": "hsp001",
  "hospedagem_id": "hpd001",
  "quarto_id": "qrt101",
  "data_avaliacao": "2025-04-12T18:00:00.000Z",
  "nota_geral": 4,
  "notas_detalhadas": {
    "limpeza": 5,
    "atendimento": 4
  },
  "comentario": "Gostei do quarto e do atendimento.",
  "resposta_hotel": {
    "texto": "Obrigado pela avaliação!",
    "data": "2025-04-13T10:00:00.000Z",
    "funcionario_id": "fnc001"
  }
}
```
