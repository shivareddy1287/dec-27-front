export const DateModify = (dateFrom) => {
  if (dateFrom) {
    const fromdate = new Date(dateFrom);
    const formattedFromDate = `${fromdate.getFullYear()}-${(
      fromdate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${fromdate.getDate().toString().padStart(2, "0")}`;
    return formattedFromDate;
  }
};

export const dateTimeFormate = (givenDate) => {
  if (givenDate) {
    const dateTimeString = givenDate;
    const dateTime = new Date(dateTimeString);

    //   // Extract date
    //   const year = dateTime.getFullYear();
    //   const month = dateTime.getMonth() + 1; // Month is zero-based
    //   const day = dateTime.getDate();
    //   const formattedDate = `${day}/${month}/${year}`;

    // Extract date
    const year = dateTime.getFullYear();
    const monthIndex = dateTime.getMonth();
    const day = dateTime.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;

    // Extract time
    // const hours = dateTime.getHours();
    // const minutes = dateTime.getMinutes();

    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    // const seconds = dateTime.getSeconds().toString().padStart(2, '0');
    // const formattedTime = `${hours}:${minutes}:${seconds}`;

    //   const seconds = dateTime.getSeconds();
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate} ${formattedTime}`;

    //   console.log("Formatted Date:", formattedDate);
    //   console.log("Formatted Time:", `${formattedDate} ${formattedTime}`);
  }
};

export const dateOnlyFormate = (givenOnlyDate) => {
  if (givenOnlyDate) {
    const dateTimeString = givenOnlyDate;
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const monthIndex = dateTime.getMonth();
    const day = dateTime.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    // console.log(givenOnlyDate, formattedDate, "Date Only");
    return formattedDate;
  }
};

// {
//   dateOnlyFormate();
// }

// {
//   dateTimeFormate();
// }
