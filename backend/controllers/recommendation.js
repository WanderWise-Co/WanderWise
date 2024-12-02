const express = require('express');
const {spawn} = require('child_process')
const fs = require('fs')
const path = require('path')
const {BadRequestError} = require('../errors/index')

const hotel_reco = async(req,res)=>{
    const {selected_features} = req.body;
}