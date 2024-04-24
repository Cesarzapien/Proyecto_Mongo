package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.controller.CarroController;
import org.utl.dsm.modelo.Carro;

@Path("carro")
public class Rest_Dragonborn {
   
  private final CarroController carroController;
  private final Gson gson;

  public Rest_Dragonborn() {
    this.carroController = new CarroController();
    this.gson = new Gson();
  }

  @Path("insertar")
@POST
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public Response insertar(String carroJson) {
    try {
        Carro carro = gson.fromJson(carroJson, Carro.class);
        carroController.insertar(carro);
        String jsonResponse = gson.toJson(carro);
        return Response.status(Response.Status.CREATED).entity(jsonResponse).build();
    } catch (Exception ex) {
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("{\"error\":\"" + ex.getMessage() + "\"}")
                .build();
    }
}

@Path("eliminar/{numSerie}")
@DELETE
@Produces(MediaType.APPLICATION_JSON)
public Response eliminar(@PathParam("numSerie") int numSerie) {
  try {
    carroController.eliminar(numSerie);
    return Response.status(Response.Status.OK).entity("{\"message\":\"Carro eliminado correctamente\"}").build();
  } catch (Exception ex) {
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity("{\"error\":\"" + ex.getMessage() + "\"}")
        .build();
  }
}

@Path("actualizar")
@PUT
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public Response actualizar(String carroJson) {
  try {
    Carro carro = gson.fromJson(carroJson, Carro.class);
    carroController.actualizar(carro);
    String jsonResponse = gson.toJson(carro);
    return Response.status(Response.Status.OK).entity(jsonResponse).build();
  } catch (Exception ex) {
    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
        .entity("{\"error\":\"" + ex.getMessage() + "\"}")
        .build();
  }
}



  @Path("getall")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAll() {
    try {
      List<Carro> carros = carroController.getAllCarro();
      String jsonResponse = gson.toJson(carros);
      return Response.status(Response.Status.OK).entity(jsonResponse).build();
    } catch (Exception ex) {
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
              .entity("{\"error\":\"" + ex.getMessage() + "\"}")
              .build();
    }
  }
}
