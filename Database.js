import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "recetaslocal.db";
const database_version = "1.0";
const database_displayname = "SQLite recetas Offline Database";
const database_size = 200000;

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM recetas LIMIT 1').then(() => {
                console.log("Database is ready ... executing query ...");
              }).catch((error) => {
                console.log("Received error: ", error);
                console.log("Database not yet ready ... populating data");
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS recetas (uid, titulo, categoria, ingredientes, imagen, preparacion, sinc)');
                }).then(() => {
                  console.log("Table created successfully");
                }).catch(error => {
                  console.log(error);
                });
              });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
    });
  };




  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };


  reiniciaDB() {
    let db;
    return new Promise((resolve) => {
      console.log(database_name)
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Abriendo");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
          
              db.executeSql('SELECT 1 FROM recetas LIMIT 1').then(() => {
                console.log("Abierta");
                db.close()
                console.log("cerrando");
              })
              resolve(db);
            })       
        })
      
    });
  };
  
  listRecetas(cate) {
    return new Promise((resolve) => {
      const recetas = [];
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT r.uid, r.titulo, r.imagen, r.categoria FROM recetas r', []).then(([tx, results]) => {
            console.log("Query completed");
            var len = results.rows.titulo
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log(`Receta ID: ${row.uid}, Receta Name: ${row.titulo}`)
              const { uid, titulo, imagen, categoria } = row;
              if (row.categoria == cate || cate == '*' ) {
                recetas.push({
                  uid,
                  titulo,
                  imagen,
                  categoria
                });
              }
              }

              resolve(recetas);
          });
        }).then((results) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  recetasById(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          console.log('seunda' + id)
          tx.executeSql(`SELECT * FROM recetas WHERE uid = ${id}`).then(([tx, results]) => {
            console.log(results);
            if (results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
              console.log('entra')
            } else console.log('id de else ' + id)
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  addRecetas(rec,db) {
      return new Promise((resolve) => {
        this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO recetas VALUES (?, ?, ?, ?, ?, ?, ?)', [rec.uid, rec.titulo, rec.categoria, rec.ingredientes, rec.imagen, rec.preparacio, rec.sinc]).then(([tx, results]) => {
              resolve(results);
            });
          }).then((results) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log('1');
          });
        }).catch((err) => {
          console.log('2');
        });
      });

    
  }

  updateRecetas(uid, receta) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE recetas SET titulo = ?, categoria = ?, ingredientes = ?, imagen = ?, preparacion = ?, sinc = ? WHERE uid = ?', [receta.titulo, receta.categoria, receta.ingredientes, receta.imagen, receta.preparacion, receta.sinc, receta.uid]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  } 

  addRecetas2(rec) {
    return new Promise((resolve) => {
     
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO recetas VALUES (?, ?, ?, ?, ?, ?, ?)', [rec.uid, rec.titulo, rec.categoria, rec.ingredientes, rec.imagen, rec.preparacio, rec.sinc]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((results) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
  
  }


/*   updateProduct(id, prod) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?', [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice, id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
 */
  
  //COMANDO PARA TRUNCAR LA TABLA
  truncateRecetas() {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          alert('a')
          tx.executeSql('DELETE FROM recetas').then(([tx, results]) => {
          });
        }).then((results) => {

          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  
  deleteRecetas(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM recetas WHERE uid= ?', [id]).then(([tx, results]) => {
            console.log(results);
            resolve(results);
          });
        }).then((results) => {
          this.closeDatabase(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
