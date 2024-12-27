class UserDTO {
  constructor(user) {
    if (!user) {
      throw new Error("User data is required");
    }

    // Map only the data transformation logic
    this.id = user._id?.toString() || user.id; // Handle both Mongo ObjectId and regular id
    this.email = user.email;
    this.role = user.role || "USER";
    this.photo = user.photo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    this.isOnline = user.isOnline || false;
    this.verify = user.verify || false;

    // Only include sensitive fields if they exist
    if (user.password) this.password = user.password;
    if (user.verifyCode) this.verifyCode = user.verifyCode;

    // Preserve timestamps if existen
    if (user.createdAt) this.createdAt = user.createdAt;
    if (user.updatedAt) this.updatedAt = user.updatedAt;
  }

  toJSON() {
    // Exclude sensitive data when converting to JSON
    const { password, verifyCode, ...publicData } = this;
    return publicData;
  }
}

export default UserDTO;
