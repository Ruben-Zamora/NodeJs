import { Request, Response } from "express"
import Series from "../models/series";


const getAll = async (req: Request, res: Response) =>{
    await Series.find()
        .then(
            (data) =>{
                return res.status(200).json({message: `Get All Series: ${data}`});
            }
        )
        .catch(
            err=>{
                return res.status(400).json({message: `Something goes wrong`});
            }
        );
}

const get = async (req: Request, res: Response) =>{
    const id= req.params.id;

    Series.findById(id, function(err: any,serie: any){
        if(err){
            return res.status(404).json({message: `Serie doesn't exist`});
        }
        if(serie===null){
            return res.status(400).json({message: `Something goes wrong`});
        }
        return res.status(200).json({message: `Get One Serie with id ${id}: ${serie}`});
    });
}

const create = async (req: Request, res: Response) =>{
    const {name, director, language, year, seasons} = req.body;

    //TODO VALIDATION
    if(!name || !director || !seasons || !language){
        return res.status(400).json({message: "Only year can be empty"});
    }

    if(name==='' || director==='' || language==='' ||  seasons<1 || seasons===null){
        return res.status(400).json({message: "Only year can be empty"});
    }

    const serieExist= await Series.findOne({name}).exec();
    if(serieExist){
        return res.status(400).json({message: 'Serie already exist'});
    }

    if ((year && year<1500) || year===0){
        return res.status(400).json({message: 'Need to be a year after 1500'});
    }

    //TODO CREATE
    const newSerie = new Series({
        name,
        director,
        language,
        year,
        seasons
    })

    const result = await newSerie.save();

    return res.status(200).json({message: `Create Serie`, data: newSerie});
}

const update = async (req: Request, res: Response) =>{
    const id= req.params.id;
    Series.findById(id, function(err: any,serie: any){
        if(err){
            return res.status(404).json({message: `Serie doesn't exist`});
        }
        if(serie===null){
            return res.status(400).json({message: `Something goes wrong`});
        }

        const body=req.body;

        if ((body.year && body.year<1500) || body.year===0){
            return res.status(400).json({message: 'Need to be a year after 1500'});
        }
        serie.name=body.name ?? serie.name;
        serie.director=body.director ?? serie.director;
        serie.language=body.language ?? serie.language;
        serie.year=body.year ?? serie.year;
        serie.seasons=body.seasons ?? serie.seasons;

        serie.save((err: any, serie: any)=> {
            if(err){
                return res.status(400).json({message: `Something goes wrong ${err}`});
            }
            return res.status(200).json({message: `Update Serie with id ${id}: ${serie}`});
        })

    });
    
}

const remove = (req: Request, res: Response) =>{
    const id= req.params.id;

    Series.findByIdAndDelete(id, function(err: any){
        if(err){
            return res.status(404).json({message: `Serie doesn't exist`});
        }
        return res.status(204).json({message: `Serie with id ${id} deleted`});
    });
}

export default { getAll, get, create, update, remove };