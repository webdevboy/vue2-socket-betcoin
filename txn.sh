#!/bin/bash
D=`date +"%Y%m%d%H%M%S"`
TXNID=${1} /home/ubuntu/.nvm/versions/node/v6.10.2/bin/node /home/ubuntu/ChratosMining/services/guldenWallet/newTransaction.js ${1}
echo ${D} - ${1}