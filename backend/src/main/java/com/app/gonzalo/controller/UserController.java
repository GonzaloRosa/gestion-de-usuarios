package com.app.gonzalo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.gonzalo.models.User;
import com.app.gonzalo.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> listar(){
        return userService.listarUsuario();
    }
    

    @PostMapping
    public User crearUsuario(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public User actualizarUsuario(@PathVariable Long id, @RequestBody User user) {
        User usuarioExistente = userService.findById(id);
        if (usuarioExistente != null) {
            usuarioExistente.setNombre(user.getNombre());
            usuarioExistente.setApellido(user.getApellido());
            usuarioExistente.setEmail(user.getEmail());
            usuarioExistente.setTelefono(user.getTelefono());
            usuarioExistente.setContrasenia(user.getContrasenia());
            userService.save(usuarioExistente);
        }
        return usuarioExistente;
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        userService.borrarPorId(id);
    }

}
