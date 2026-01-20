const transitions = {
    pending: ['assigned', 'cancelled'],
    assigned: ['in_progress', 'cancelled', 'failed'],
    in_progress: ['completed', 'failed'],
    failed:['assigned'],
    completed:[],
    cancelled:[]
}

export const isvalidTransition = (from, to)=> {
    if(!transitions[from]) return false;

    return transitions[from].includes(to);
}



export const allowed_transitions = (actor, from, to) =>{
    if(actor === 'admin') return true;

    if(actor === 'customer') return (from === 'pending' && to === 'cancelled');

    if(actor === 'provider') {
        return( (from === 'assigned' && ['failed'].includes(to)) ||
                (from === 'assigned' && to === 'in_progress') || (from === 'in_progress' && to === 'completed'));
    }

    if(actor ==='system') return ['pending', 'failed'].includes(from) && to === 'assigned';

    return false;
}




export const validateTrans = (from, to, actor) =>{
    if(!isvalidTransition(from, to)) {
        throw new Error(`invalid transition ${from} to ${to}`);
    }


    if(!allowed_transitions(actor, from, to)) {
        throw new Error(`${actor} is not allowed to transition ${from} to ${to}`);
    }

    return true;
}