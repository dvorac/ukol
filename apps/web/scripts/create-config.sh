#!/bin/bash

# Create an associative array to store the JSON data
declare -A json_data

# Add environment variables to the array
for var in "${!MY_*}"; do
    key="${var#MY_}"  # Remove the "MY_" prefix from the variable name
    json_data["$key"]="${!var}"
done

# Convert the array to JSON using jq
json_string=$(jq -n --argjson data "$json_data" '$data')

# Write the JSON string to a file
echo "$json_string" > output.json