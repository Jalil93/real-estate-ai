import json

def list_fields(filepath):
    """
    Reads a JSON file and returns a list of lists containing the requested fields.

    Parameters:
        filepath (str): path to the .json file

    Returns:
        list: extracted values
    """
    with open(filepath, "r") as f:
        data = json.load(f)
        print(f'loaded data type is: {type(data)}. \n')# data becomes a Python list/dict depending on file
        fieldArr = data['fields']
        fields = []
        for field in fieldArr:
            fields.append(field['name'])
        print(f'There are {len(fields)} fields.')
    return fields
    # results = []
    # for obj in data:
    #     entry = []
    #     for field in fields:
    #         entry.append(obj.get(field))  # .get() avoids KeyError if field missing
    #     results.append(entry)

    # return results



def create_values_object(fields_list):
    fields_object = {}
    for field in fields_list:
        fields_object[str(field)] = ''
    all_values = json.dumps(fields_object)
    return all_values






def main():
    path = '//src/whimsical_startup/nvar_residential_contract_template.json'

    list = list_fields(path)
    print(list)

    print(create_values_object(list))


if __name__ == "__main__":
    main()