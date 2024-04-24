/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.modelo;

import java.util.Date;

/**
 *
 * @author Usuario
 */
public class Carro {
    int numSerie;
    String marca;
    String modelo;
    Date fechaCreacion;
    double tanqueGasolina;
    boolean equipoAudio;

    public Carro(int numSerie, String marca, String modelo, Date fechaCreacion, double tanqueGasolina, boolean equipoAudio) {
        this.numSerie = numSerie;
        this.marca = marca;
        this.modelo = modelo;
        this.fechaCreacion = fechaCreacion;
        this.tanqueGasolina = tanqueGasolina;
        this.equipoAudio = equipoAudio;
    }
    
    
    public Carro(){
        
    }

    public int getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(int numSerie) {
        this.numSerie = numSerie;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public double getTanqueGasolina() {
        return tanqueGasolina;
    }

    public void setTanqueGasolina(double tanqueGasolina) {
        this.tanqueGasolina = tanqueGasolina;
    }

    public boolean isEquipoAudio() {
        return equipoAudio;
    }

    public void setEquipoAudio(boolean equipoAudio) {
        this.equipoAudio = equipoAudio;
    }

    @Override
    public String toString() {
        return "Carro{" + "numSerie=" + numSerie + ", marca=" + marca + ", modelo=" + modelo + ", fechaCreacion=" + fechaCreacion + ", tanqueGasolina=" + tanqueGasolina + ", equipoAudio=" + equipoAudio + '}';
    }

    
    
    
    
}
