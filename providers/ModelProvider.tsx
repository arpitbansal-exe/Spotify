"use client"
import { useEffect, useState } from "react"

import AuthModal from "@/app/componants/AuthModal"
import UploadModal from "@/app/componants/UploadModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) return null;

    return (
        <div>
            <AuthModal />
            <UploadModal />
        </div>
    );
}
export default ModalProvider;