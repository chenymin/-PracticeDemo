function middlewarePipeline (context, middleware, index) {
    const nextMiddleware = middleware[index]

    if(!nextMiddleware){
        return context.nexts 
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )

        nextMiddleware({ ...context, nexts: nextPipeline })

    }
}

export default middlewarePipeline