package org.utl.dsm.controller;

import com.google.gson.Gson;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;
import org.utl.dsm.modelo.Carro;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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
      // Convertir objeto Carro a Document
      Document car = new Document();
      car.append("numSerie", carro.getNumSerie())
         .append("marca", carro.getMarca())
         .append("modelo", carro.getModelo())
         .append("fechaCreacion", carro.getFechaCreacion())
         .append("tanqueGasolina", carro.getTanqueGasolina())
         .append("equipoAudio", carro.isEquipoAudio());

      // Insertar el documento en la colección
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
        Carro carro = new Carro(
            document.getInteger("numSerie"),
            document.getString("marca"),
            document.getString("modelo"),
            document.getDate("fechaCreacion"),
            document.getDouble("tanqueGasolina"),
            document.getBoolean("equipoAudio")
        );
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
      // Convertir objeto Carro a Document
      Document filter = new Document("numSerie", carro.getNumSerie());
      Document update = new Document("$set", new Document("marca", carro.getMarca())
          .append("modelo", carro.getModelo())
          .append("fechaCreacion", carro.getFechaCreacion())
          .append("tanqueGasolina", carro.getTanqueGasolina())
          .append("equipoAudio", carro.isEquipoAudio()));

      // Actualizar el documento en la colección
      collection.updateOne(filter, update);
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

    


