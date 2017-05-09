import sys

def read_in():
    lines = sys.stdin.readlines()
    return lines

def main():
    lines = read_in()

    for item in lines:
        print item

main()
