import {MongoDriver} from '.'
import {Constants, Logger} from '../common'

const randomLocation = require('random-location')

export class SimulationController {


    public constructor(){

    }

    public static simulateLog(){
        
    }


    public timeStamp(){

        let hour = this.getProbabilisticSplittedIntRange(Constants.DANGER_HOUR_BEGIN, Constants.DANGER_HOUR_DURATION, 0, 24, Constants.NON_DANGER_PROBABILITY).toString().padStart(2,'0')
        let day = this.getProbabilisticSplittedIntRange(Constants.ACTIVITY_DAYS_BEGIN, Constants.ACTIVITY_DAYS_DURATION, 0, 7, Constants.NON_ACTIVITY_PROBABILITY)

        return `2020-11-${day}T${hour}:00:54.280Z` // En noviembre 2020 hubo un domingo 1 xd

    }

    public static simulateLocation()
    {
        //const randomCirclePoint = (centerPoint, radius, randomFn = Math.random) => { ... }
        
        const locationRandom = Math.random() * 100
        let referencePoint : {latitude : number, longitude : number }
        if (locationRandom < 20)
        {
            referencePoint = { latitude : Constants.NARANJO_REFERENCE_LAT, longitude : Constants.NARANJO_REFERENCE_LONG }
        }
        else if (locationRandom < 60)
        {   
            referencePoint = { latitude : Constants.CURRIDABAT_REFERENCE_LAT, longitude : Constants.CURRIDABAT_REFERENCE_LONG }
        }
        else
        {
            referencePoint = { latitude : Constants.ZAPOTE_REFERENCE_LAT, longitude : Constants.ZAPOTE_REFERENCE_LAT }
        }

        return randomLocation.randomCirclePoint(referencePoint, Constants.RADIUS_PER_CANTON)

    }

    public getRandomInt(min : number, max : number) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    
    public getProbabilisticSplittedIntRange(pPortionBegin : number, pPortionLength : number, pRangeBegin : number, pRangeEnd : number, pNonSplittedProbability : number)
    {
        const decision = Math.random() * 100
        let result : number

        let rangeLength = pRangeEnd - pRangeBegin
        let nonSplittedBegin = (pPortionBegin + pPortionLength + 1) % rangeLength
        
        if (decision < pNonSplittedProbability)
        {
            result = this.getRandomInt(nonSplittedBegin, pPortionBegin)
        }
        else
        {
            result = (this.getRandomInt(pPortionBegin, pPortionBegin + pPortionLength)) % rangeLength
        }
        
        return result
    }


}