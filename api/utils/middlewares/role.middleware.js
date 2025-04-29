// Role Groups - Centralized Configuration
const ROLE_GROUPS = {
    ADMIN: ['management'],
    EDITORS: ['employee', 'management', 'client'],
    CLIENTS: ['client']
};

// Middleware Factory - Dynamically checks roles
const roleAuthorize = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role;
            // Case 1: No role detected (user not authenticated)
            if (!userRole) {
                return res.status(401).json({ message: "ERROR: User not authenticated." });
            }
            // Case 2: Role not allowed
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                message: `ERROR: Access forbidden. Required roles: ${allowedRoles.join(', ')}`
                });
            }
            // Case 3: Role allowed → proceed
            next();
        } catch (error) {
            res.status(500).json({ message: "ERROR: Role validation failed." });
        }
    };
};

// Pre-Defined Middlewares (Reusable across routes)
module.exports = {
    // Admins only (e.g., management)
    groupAdmin: roleAuthorize(ROLE_GROUPS.ADMIN),

    // Editors (employees + management)
    groupEditors: roleAuthorize(ROLE_GROUPS.EDITORS),

    // Clients only
    groupClients: roleAuthorize(ROLE_GROUPS.CLIENTS)
};