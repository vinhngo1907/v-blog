export const imageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "xwqohnif")
    formData.append("cloud_name", "devat-channel")

    const res = await fetch("https://api.cloudinary.com/v1_1/devat-channel/upload", {
        method: "POST",
        body: formData
    })

    const data = await res.json()
    return { public_id: data.public_id, url: data.secure_url };
}