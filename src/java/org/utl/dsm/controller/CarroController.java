package org.utl.dsm.controller;

import com.google.gson.Gson;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;
import org.utl.dsm.modelo.Carro;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.bson.conversions.Bson;


public class CarroController {
   
  private static final String DATABASE_NAME = "carrodb";
  private static final String COLLECTION_NAME = "carro";

  private final MongoClient mongoClient;
  private final MongoDatabase database;
  private final MongoCollection<Document> collection;
  private final Gson gson;

  public CarroController(){
     // Establish the connection with MongoDB
    mongoClient = MongoClients.create("mongodb://localhost:27017");
    // Select the database
    database = mongoClient.getDatabase(DATABASE_NAME);
    // Select the collection
    collection = database.getCollection(COLLECTION_NAME);
    // Initialize Gson
    gson = new Gson();
  }
   
  public void insertar(Carro carro) {
        try {
            // Verificar que los campos obligatorios no estén vacíos
            if (carro.getNumSerie() == 0 || carro.getMarca().isEmpty()) {
                throw new IllegalArgumentException("Los campos obligatorios (numSerie, marca, equipoAudio) son requeridos.");
            }

            // Convertir objeto Carro a Document y realizar la inserción en MongoDB
            Document car = new Document();
            car.append("numSerie", carro.getNumSerie())
                    .append("marca", carro.getMarca())
                    .append("equipoAudio", carro.isEquipoAudio());

            // Agregar los campos opcionales si tienen valor
            if (carro.getModelo() != null) {
                car.append("modelo", carro.getModelo());
            }
            if (carro.getFechaCreacion() != null) {
                car.append("fechaCreacion", carro.getFechaCreacion());
            }
            if (carro.getTanqueGasolina() != 0.0) {
                car.append("tanqueGasolina", carro.getTanqueGasolina());
            }

            collection.insertOne(car);
            System.out.println("Carro insertado correctamente");
        } catch (Exception e) {
            System.err.println("Error al insertar carro en MongoDB: " + e.getMessage());
        }
    }
   
  public List<Carro> getAllCarro() {
    List<Carro> carros = new ArrayList<>();
    try {
        // Obtener todos los documentos de la colección
        FindIterable<Document> documents = collection.find();

        // Iterar sobre los documentos y convertirlos a objetos Carro
        for (Document document : documents) {
            Carro carro = new Carro();

            if (document.containsKey("numSerie")) {
                carro.setNumSerie(document.getInteger("numSerie"));
            }
            if (document.containsKey("marca")) {
                carro.setMarca(document.getString("marca"));
            }
            if (document.containsKey("modelo")) {
                carro.setModelo(document.getString("modelo"));
            }
            if (document.containsKey("fechaCreacion")) {
                carro.setFechaCreacion(document.getDate("fechaCreacion"));
            }
            if (document.containsKey("tanqueGasolina")) {
                carro.setTanqueGasolina(document.getDouble("tanqueGasolina"));
            }
            if (document.containsKey("equipoAudio")) {
                carro.setEquipoAudio(document.getBoolean("equipoAudio"));
            }

            carros.add(carro);
        }
    } catch (Exception e) {
        System.err.println("Error al recuperar carros de MongoDB: " + e.getMessage());
    }
    return carros;
}

  
   public void eliminar(int numSerie) {
    try {
      // Eliminar el documento de la colección
      collection.deleteOne(eq("numSerie", numSerie));
      System.out.println("Carro eliminado correctamente");
    } catch (Exception e) {
      System.err.println("Error al eliminar carro en MongoDB: " + e.getMessage());
    }
  }

  public void actualizar(Carro carro) {
    try {
        // Crear un filtro para encontrar el carro por su número de serie
        Bson filtro = Filters.eq("numSerie", carro.getNumSerie());

        // Crear un documento con los campos a actualizar
        Document actualizacion = new Document();
        if (carro.getMarca() != null) {
            actualizacion.append("marca", carro.getMarca());
        }
        if (carro.getModelo() != null) {
            actualizacion.append("modelo", carro.getModelo());
        }
        if (carro.getFechaCreacion() != null) {
            actualizacion.append("fechaCreacion", carro.getFechaCreacion());
        }
        if (carro.getTanqueGasolina() != 0.0) {
            actualizacion.append("tanqueGasolina", carro.getTanqueGasolina());
        }
        
        actualizacion.append("equipoAudio", carro.isEquipoAudio());

        // Actualizar el documento en la colección
        collection.updateOne(filtro, new Document("$set", actualizacion));
        System.out.println("Carro actualizado correctamente");
    } catch (Exception e) {
        System.err.println("Error al actualizar carro en MongoDB: " + e.getMessage());
    }
}

   
  public void closeConnection() {
    // Cerrar la conexión con MongoDB
    if (mongoClient != null) {
      mongoClient.close();
    }
  }
}

    


