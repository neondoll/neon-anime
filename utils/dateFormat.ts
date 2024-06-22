export default function (value: string | undefined) {
  if (value) {
    const date = new Date(value);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  }

  return undefined;
}
