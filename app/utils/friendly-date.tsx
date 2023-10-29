

export const friendlyDate = (date: Date): React.ReactNode => {

    const day = date.getDate();
    const month = date.getMonth()
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const friendlyDate = `${day}/${month}/${year} @ ${hours}:${minutes === 0 ? '00' : minutes}`;
    return <span>{friendlyDate}</span>
}