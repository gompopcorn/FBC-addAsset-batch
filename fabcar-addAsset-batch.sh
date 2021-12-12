#!/bin/bash

carNumber=$1  # index of the first car
numOfAdds=$2  # number of the cars to add
counter=1
delay=0.001


###########################################################################
#       first change directory to fabric-samples/test-network folder
###########################################################################

test_network_dir="/usr/local/go/src/github.com/hyperledger/fabric-samples/test-network"

cd $test_network_dir

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

# install one peer0 Org1
. ./scripts/envVar.sh

# use Org1
setGlobals 1

while [ $counter -le $numOfAdds ]
do

  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile \
  ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
  -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles \
  ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses \
  localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c \
  '{"function":"createCar", "Args":["bash_car_'$carNumber'", "Benz","HN","blue","Alireza.HN"]}'

  carNumber=$((carNumber + 1))
  counter=$((counter + 1))

  # sleep $delay

done
