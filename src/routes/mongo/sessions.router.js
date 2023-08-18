import { Router } from "express"
import passport from "passport";
import { registerUser, loginUser, logoutUser, currentUser, adminUser } from '../../controllers/sessions.controller.js';
import auth from "../../middlewares/auth.middleware.js";
const router = Router();

router.post('/register', passport.authenticate("register", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    registerUser(req, res);
});

router.get('/failregister', async (req, res) => {
    return res.status(500).send("Failed");
});
router.post('/login', passport.authenticate("login", { failureRedirect: "/failureRedirect" }), async (req, res) => {
    loginUser(req, res);
});

router.get("/github", passport.authenticate("github"), async (req, res) => { });

router.get("/githubcallback", passport.authenticate("github"), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
    };
    res.redirect("/home");
}
);

router.get("/private", auth, adminUser);

router.get("/logout", logoutUser );
    

router.get("/current", currentUser)

export default router
