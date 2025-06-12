export const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vsosr4ei");
    formData.append("cloud_name", "v-webdev");

    const res = await fetch("https://api.cloudinary.com/v1_1/v-webdev/upload", {
        method: "POST",
        body: formData
    })

    const data = await res.json();
    console.log({data})
    return { public_id: data.public_id, url: data.secure_url };
}

export const checkFile = (file: File) => {
    const types = ['image/png', 'image/jpeg']

    let err = "";
    if (!file) return err = "File does not exist, please upload a file";

    if (file.size > 1024 * 1024) return err = "The largest image size is 1mb";

    if (!types.find(type => file.type === type)) return err = "The image type is png / jpeg";

    return err;
}