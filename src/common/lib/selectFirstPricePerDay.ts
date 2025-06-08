export default function selectFirstPricePerDay(
  days: { date: Date; value: number }[],
) {
  // Map с ключом - строка даты в формате YYYY-MM-DD, значением - самая ранняя запись
  const map = new Map<string, { date: Date; value: number }>();

  for (const day of days) {
    const dayKey = day.date.toISOString().slice(0, 10); // YYYY-MM-DD

    const existing = map.get(dayKey);
    if (!existing || day.date < existing.date) {
      map.set(dayKey, day);
    }
  }

  // Возвращаем отсортированный массив по дате
  return Array.from(map.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
}
