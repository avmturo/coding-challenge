type TeamStats = {
    name: String;
    points: number;
}

type Division = Array<TeamStats>

export const getResults = (division: Division, n: number): String => {
    // To avoid checks later on, if n is greater than half the number of teams there will be overlaps
    if(n > division.length / 2) {
        return 'Too many teams being relegated and promoted'
    }
    // O(n log n) complexity here, which given the max length of 16 defined in the use case, isn't a problem. This
    // uses all Array.Prototype functions, and would be clear to any other front-end dev.
    // You could achieve better by doing a single loop through division, and comparing with two Arrays of n length
    // which would hold the n smallest and n largest values, comparing with each value and shift-inserting the value
    // when the compare is less than or greater than (respectively) the n[i].
    // Followed by popping the last value, to maintain size n.
    // Given the restriction division max length = 16, this would require more code, our own shift insert logic,
    // and would take away from the readability of the below, without offering enough in complexity improvement.
    division.sort((a,b) => b.points - a.points);
    const firstNTeamNames = division.slice(0, n).map(({name}) => name)
    const lastNTeamNames = division.slice(-n).map(({name}) => name)

    // check that there are no overlaps
    for (const name of firstNTeamNames) {
        if (lastNTeamNames.includes(name)) {
            return 'Overlap in relegated and promoted teams'
        }
    }

    // Though not in the useCase constraints, you would probably want to run the above check on the points also,
    // or have some sort of resolution in the case when there are many teams with the same points.

    return `Promote:\n${firstNTeamNames.join('\n')}\n\nRelegate:\n${lastNTeamNames.join('\n')}`
};
