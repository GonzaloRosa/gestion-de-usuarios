package com.app.gonzalo.service;

import java.util.List;

import com.app.gonzalo.models.User;

public interface UserService {
    public User save(User user);

    public List<User> listarUsuario();

    public void borrarPorId(Long id);

    public User findById(Long id);
}
