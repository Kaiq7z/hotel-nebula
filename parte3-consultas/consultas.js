// Parte 3 - Consultas
db = db.getSiblingDB("hotel_nebula_atividade");

// 1. Quartos de luxo, com vista para o mar e banheira
print("1. Quartos com as características pedidas");
printjson(db.quartos.find({
  categoria: "luxo",
  "caracteristicas.vista": "mar",
  "caracteristicas.banheira": true
}, { _id: 0, numero: 1, tipo: 1, preco_diaria: 1 }).toArray());

// 2. Hóspedes com mais de uma reserva, sem contar cancelamentos
print("2. Hóspedes que reservaram mais de uma vez");
printjson(db.reservas.aggregate([
  { $match: { status: { $in: ["confirmada", "concluida"] } } },
  { $group: { _id: "$hospede_id", quantidade: { $sum: 1 } } },
  { $match: { quantidade: { $gt: 1 } } },
  { $lookup: {
    from: "hospedes",
    localField: "_id",
    foreignField: "_id",
    as: "hospede"
  } },
  { $unwind: "$hospede" },
  { $project: { _id: 0, nome: "$hospede.nome", quantidade: 1 } },
  { $sort: { nome: 1 } }
]).toArray());

// 3. Faturamento de abril de 2025: somente pagamentos recebidos
print("3. Faturamento de abril de 2025");
printjson(db.pagamentos.aggregate([
  { $match: {
    status: "pago",
    data_pagamento: {
      $gte: ISODate("2025-04-01T00:00:00.000Z"),
      $lt: ISODate("2025-05-01T00:00:00.000Z")
    }
  } },
  { $group: { _id: null, faturamento: { $sum: "$valor_total" } } },
  { $project: { _id: 0, faturamento: 1 } }
]).toArray());

// 4. Faturamento anual de 2025
print("4. Faturamento de 2025");
printjson(db.pagamentos.aggregate([
  { $match: {
    status: "pago",
    data_pagamento: {
      $gte: ISODate("2025-01-01T00:00:00.000Z"),
      $lt: ISODate("2026-01-01T00:00:00.000Z")
    }
  } },
  { $group: { _id: null, faturamento: { $sum: "$valor_total" } } },
  { $project: { _id: 0, faturamento: 1 } }
]).toArray());

// 5. Meses com mais reservas em 2025, pelo check-in previsto
print("5. Reservas por mês de check-in em 2025");
printjson(db.reservas.aggregate([
  { $match: {
    status: { $in: ["confirmada", "concluida"] },
    data_checkin: {
      $gte: ISODate("2025-01-01T00:00:00.000Z"),
      $lt: ISODate("2026-01-01T00:00:00.000Z")
    }
  } },
  { $group: { _id: { $month: "$data_checkin" }, quantidade: { $sum: 1 } } },
  { $project: { _id: 0, mes: "$_id", quantidade: 1 } },
  { $sort: { quantidade: -1, mes: 1 } }
]).toArray());

// 6. Dias da semana com mais chegadas previstas em 2025
// O número 1 é domingo, 2 é segunda, até 7 que é sábado.
print("6. Check-ins previstos por dia da semana em 2025");
printjson(db.reservas.aggregate([
  { $match: {
    status: { $in: ["confirmada", "concluida"] },
    data_checkin: {
      $gte: ISODate("2025-01-01T00:00:00.000Z"),
      $lt: ISODate("2026-01-01T00:00:00.000Z")
    }
  } },
  { $group: { _id: { $dayOfWeek: "$data_checkin" }, quantidade: { $sum: 1 } } },
  { $project: { _id: 0, dia_semana: "$_id", quantidade: 1 } },
  { $sort: { quantidade: -1, dia_semana: 1 } }
]).toArray());
