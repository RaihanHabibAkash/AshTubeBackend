export const registerRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("Hlow")
    });
}