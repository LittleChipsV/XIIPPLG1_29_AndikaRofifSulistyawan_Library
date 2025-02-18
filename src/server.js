require("dotenv").config();
const { sequelize } = require("./models");
const app = require('./app')

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Berhasil terkoneksi ke basis data");

    await sequelize.sync();
    console.log("Berhasil menyinkronkan skema basis data");

    app.listen(PORT, () =>
      console.log(`Server berhasil dijalankan di port ${PORT}`)
    );
  } catch (error) {
    console.error("Gagal terkoneksi ke basis data:", error);
    process.exit(1);
  }
};

startServer();
