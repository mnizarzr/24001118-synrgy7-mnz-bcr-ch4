class App {
  constructor() {
    this.withDriver = document.getElementById("with-driver");
    this.date = document.getElementById("filter-date");
    this.availableAt = document.getElementById("available-at");
    this.seats = document.getElementById("seats");
    this.searchBtn = document.getElementById("search-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  init = async ({ withDriver, date, availableAt, seats = null }) => {

    if (withDriver !== undefined || withDriver !== null ||
      date !== undefined || date === null ||
      availableAt !== undefined || availableAt !== null) {

      this.withDriver.value = withDriver
      this.date.value = date
      this.availableAt.value = availableAt
      if (seats !== null) this.seats.value = seats

      await this.load();
      this.run();
    }

    this.searchBtn.addEventListener('click', async function () {
      await this.load();
      this.clear();
      this.run();
    });

    this.withDriver.addEventListener('change', this.checkInputs);
    this.date.addEventListener('change', this.checkInputs);
    this.availableAt.addEventListener('change', this.checkInputs);
  }

  run = () => {
    Car.list.forEach((car) => {
      console.log(car)
      const node = document.createElement("div");
      node.classList.add('col-md-4')
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  load = async () => {

    localStorage.removeItem('CARS')

    await Binar.listCars()

    let cars = JSON.parse(localStorage.getItem('CARS'))
    cars = cars.filter(this.filterCars)

    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  }

  checkInputs = () => {
    const withDriverValue = this.withDriver.value.trim();
    const filterDateValue = this.date.value.trim();
    const availableAtValue = this.availableAt.value.trim();

    if (withDriverValue !== '' && filterDateValue !== '' && availableAtValue !== '') {
      this.searchBtn.removeAttribute('disabled');
    } else {
      this.searchBtn.setAttribute('disabled', 'true');
    }
  }

  filterCars = (car) => {
    if (this.date.value != '' && this.availableAt.value != '' && this.withDriver.value != '') {
      let inputDate = new Date(`${this.date.value} ${this.availableAt.value}`)
      let carDate = new Date(car.availableAt)

      if (carDate.getTime() >= inputDate.getTime() && Boolean(this.withDriver.value) == Boolean(car.withDriver)) {
        if (this.seats.value != '') {
          return car.capacity >= this.seats.value;
        }
        return true;
      }
    }
    return false;
  }
}
