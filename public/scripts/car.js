class Car extends Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    super();
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div class="card" style="min-height: 480px; margin-bottom: 16px;">
          <img class="card-img-top" src="${this.image}" alt="${this.model}" style="width: 100%; height: 250px" />
          <div class="card-body">
              <p class="card-text">${this.manufacture} ${this.model}</p>
              <p class="card-text">
                  <b>${formatRupiah(this.rentPerDay)} / Hari</b>
              </p>
              <p class="card-text">
                  ${this.description}
              </p>
              <p class="card-text">
                  <i class="fa-solid fa-users"></i> ${this.capacity}
                  Orang
              </p>
              <p class="card-text">
                  <i class="fa-solid fa-gear"></i> ${this.transmission}
              </p>
              <p class="card-text">
                  <i class="fa-regular fa-calendar"></i>
                  Tahun ${this.year}
              </p>
              <button href="#" class="btn btn-primary rounded-0 w-100">
                  Pilih Mobil
              </button>
          </div>
      </div>
    `;
  }
}
