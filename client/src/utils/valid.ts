import { IBlog, IUserRegister } from "./TypeScript"

export const checkPassword = (password: string, cf_password: string) => {
    if (password.length < 6) {
        return "Password must be at least 6 charactors";
    }

    if (password !== cf_password) {
        return "Password and confirm password do not match";
    }

}

export function validPhone(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
}

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validRegister = (userRegister: IUserRegister) => {
    const { name, account, password, cf_password } = userRegister;
    let errors: string[] = [];
    if (!name) {
        errors.push("Missing name");
    } else if (name.length > 20) {
        errors.push("Name is up to 20 chars.")
    }
    if (!account) {
        errors.push("Missing account");
    } else if (!validPhone(account) && !validateEmail(account)) {
        errors.push("Email or phone number format is incorrect.")
    }

    const msgPass = checkPassword(password, cf_password)
    if (msgPass) errors.push(msgPass);

    return {
        errMsg: errors,
        errLength: errors.length
    }
}

export const validCreateBlog = ({ title, content, description, thumbnail, category }: IBlog) => {
    let err: string[] = [];
    if (!title) {
        err.push("Title cannot be left blank.")
    } else if (title.trim().length < 10) {
        err.push("Title has at least 10 characters.")
    } else if (title.trim().length > 50) {
        err.push("Title is up to 50 characters long.")
    }

    if (!content) {
        err.push("Content cannot be left blank.")
    } else if (content.trim().length < 2000) {
        err.push("Content has at least 2000 characters.")
    }

    if (!description) {
        err.push("Description cannot be left blank.")
    } else if (description.trim().length < 50) {
        err.push("Description has at least 50 characters.")
    } else if (description.trim().length > 200) {
        err.push("Description is up to 200 characters long.")
    }

    if (!thumbnail) {
        err.push("Thumbnail cannot be left blank.")
    }

    if (!category) {
        err.push("Category cannot be left blank.")
    }

    return {
        errMsg: err,
        errLength: err.length
    }
}