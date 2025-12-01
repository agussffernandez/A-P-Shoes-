import express from "express";
import connection from "../database/db.js";

const router = express.Router();

// Vista login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "login",
        about: "Inicio de sesión"
    });
});

// Endpoint para manejar el login
router.post("/login", async (req, res) => {
    try { 
        const { email, password } = req.body;
        // evitamos consultas innecesarias
        if (!email || !password) {
            return res.render("login", {
                title: "login",
                about: "Inicio de sesión",
                error: "Por favor, complete todos los campos."
            });
        }
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const [ rows ] = await connection.execute(sql, [email, password]);
        // verificamos si existe el email y password
        if (rows.length === 0) {
            return res.render("login", {
                title: "login",
                about: "login dashboard",
                error: "Email o contraseña incorrectos."
            });
        }
        console.log(rows);

        const user = rows[0];
        console.log(user);

        // guardamos la informacion del usuario en la sesion
        req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        // redirigimos al dashboard(index)
        res.redirect("/dashboard");

    } catch (error) {
        console.error("Error en el login: " ,error);
        return res.render("login", {
            title: "login",
            about: "login dashboard",
            error: "Error en el servidor. Intente nuevamente."
        })
    }
});

// Endpoint para manejar el logout
router.post("/logout", (req, res) => {
    // destruimos la sesion
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión: ", err);
            return res.status(500).json({ 
                error: "Error al cerrar sesión"
            });

        }
        res.redirect("/login");
    });
});

export default router;