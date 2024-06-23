const Admincheck = async (req, res, next) => {
        try {
            const user = req.user;
            if(!user.isAdmin){
                return res.status(403).josn({error : "Access Denied, User is not Admin"})
            }
            next();
        } catch (error) {
            next(error)
        }
}