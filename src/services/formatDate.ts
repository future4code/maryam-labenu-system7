const formatDate = (todayDate) => {

    let nwd = todayDate && todayDate.split("-");
    let [year, month, newdt] = [nwd && nwd[0], nwd && nwd[1], nwd && nwd[2].split("T")];
    let [day, newHour] = [newdt && newdt[0], newdt && newdt[1].split(".")];
    let moment = newHour && newHour[0];
    let time: any = moment && moment.split(":");
    let hour = time && time[0] - 3;
    if (hour < 0) { hour = hour + 3 }
    let currentData: string = `${year}-${month}-${day}`;

    return currentData

}

export default formatDate