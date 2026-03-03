"use client"
import RevealingText from '@/components/RevealingText'
import React from 'react'
import workData from '@/utils/workdata'
import Link from 'next/link'
import { motion } from 'framer-motion'
import VideosSection from '@/components/VideosSection'

export default function Work() {
    // Using first 3 works from the workData
    const featuredWorks = workData.slice(0, 3)

    return (
        <div id='about' className=" bg-black w-full">
            <div className=" ">
                <div className="text-center ">
                    <RevealingText />
                    {/* <VideosSection /> */}
                </div>


            </div>
        </div>
    )
}
