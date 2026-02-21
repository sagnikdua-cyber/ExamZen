import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    variant?: "rect" | "circle" | "text";
}

export function Skeleton({ className, variant = "rect" }: SkeletonProps) {
    const variants = {
        rect: "rounded-lg",
        circle: "rounded-full",
        text: "rounded-md h-4 w-full"
    };

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`bg-zinc-800/50 ${variants[variant]} ${className}`}
        />
    );
}

export function ReadinessSkeleton() {
    return (
        <div className="mb-8 rounded-2xl border border-zinc-900 bg-zinc-950 p-8 h-[200px] flex items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <Skeleton variant="circle" className="h-24 w-24 shrink-0" />
                <div className="space-y-3 w-40">
                    <Skeleton variant="text" className="w-3/4" />
                    <Skeleton variant="text" className="w-full" />
                    <Skeleton variant="text" className="w-1/2" />
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-3 w-48">
                <Skeleton variant="text" className="h-3 w-1/3" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
            </div>
        </div>
    );
}
