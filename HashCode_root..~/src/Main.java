/*
    By Nabil Sadeg, Harshit Verma, Roque Chan, Qamar Zaman
    For the HashCode Qualification round 2017
 */


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    // Global variables
    static int STEP = 0;
    static ArrayList<int[]> CARS;
    static ArrayList<int[]> RIDES;
    static ArrayList<Integer>[] RESULTS;



    /*
        Main function
     */
    public static void main(String[] args) {

        // Create Scanner
        Scanner in = new Scanner(new BufferedReader(new InputStreamReader(System.in)));

        // Get header
        int R = in.nextInt();   // Rows
        int C = in.nextInt();   // Columns
        int F = in.nextInt();   // Number of cars
        int N = in.nextInt();   // Number of rides
        int B = in.nextInt();   // Number of bonuses
        int T = in.nextInt();   // Max number of steps

        // Generate the cars data
        CARS = generateCars(F);

        RESULTS = new ArrayList[F+1];
        RIDES = new ArrayList<>();

        // Get the rides data
        for (int i = 0; i < N; i++) {
            int ride[] = new int[7];

            ride[0] = in.nextInt();
            ride[1] = in.nextInt();
            ride[2] = in.nextInt();
            ride[3] = in.nextInt();
            ride[4] = in.nextInt();
            ride[5] = in.nextInt();
            ride[6] = i; // ID

            RIDES.add(ride);
        }

        // Update at each step
        while (STEP < T) {

            updateCars();
            updateRides();
            STEP++;
        }

        // Print the results
        for (int i = 1; i < RESULTS.length; i++) {
            System.out.print(RESULTS[i].size() + " ");

            for (int j = 0; j < RESULTS[i].size(); j++) {
                System.out.print(RESULTS[i].get(j) + " ");
            }

            System.out.println();
        }
    }



    /*
        Function used to generate the cars data
        ARGUMENT:   number of cars
        RETURN:     a list of possible cars
     */
    static ArrayList<int[]> generateCars(int numberOfCars) {

        ArrayList<int[]> cars = new ArrayList<>();

        // Add each car
        for (int i = 0; i < numberOfCars; i++) {
            cars.add(new int[] {i, 0, 0, 0});
        }

        return cars;
    }



    /*
        Function used to update the Rides
     */
    static void updateRides() {

        for (int i = 0; i < RIDES.size(); i++) {

            int[] currentRide = RIDES.get(i);

            // Get list of possible cars
            ArrayList<Integer> pCars = getPossibleCars(currentRide);

            if (pCars.isEmpty())
                continue;

            else if (pCars.size() == 1) {
                // Take this ride
                takeRide(i, pCars.get(0));
                continue;
            }

            // Continue the search
            pCars = shortestDistance(currentRide, pCars);

            // Take this ride
            takeRide(i, pCars.get(0));
        }
    }



    /*
        Function used to compute the shortest distance
        ARGUMENT:   ride data
                    possible cars
        RETURN:     a list of cars with the shortest distance
     */
    static ArrayList<Integer> shortestDistance(int[] ride, ArrayList<Integer> possibilities) {


        ArrayList<Integer> poss = new ArrayList<>();

        int compare[][] = new int[possibilities.size()][2];
        int min = 1000000;

        // Compute the distance foe each possible car
        for (int i = 0; i < possibilities.size(); i++) {
            int carIndex = possibilities.get(i);
            int carRideDistance = Math.abs(CARS.get(carIndex)[1] - ride[0]) + Math.abs(CARS.get(carIndex)[2] - ride[1]);

            compare[i][0] = carIndex;
            compare[i][1] = carRideDistance;

            if (carRideDistance < min)
                min = carRideDistance;
        }

        // Find minimum distance
        for (int i = 0; i < possibilities.size(); i++) {
            if (compare[i][1] == min)
                poss.add(compare[i][0]);
        }

        return poss;
    }



    /*
        Function used to update the cars
     */
    static void updateCars() {

        for (int i = 0; i < CARS.size(); i++) {

            // If it is busy decrement counter
            if (CARS.get(i)[3] > 0)
                CARS.get(i)[3]--;

        }
    }



    /*
        Function used to get the list of possible cars
        ARGUMENT:   ride data
        RETURN:     a list of possible cars
     */
    static ArrayList<Integer> getPossibleCars(int[] ride) {

        ArrayList<Integer> possibilities = new ArrayList<>();

        int i = 0;

        for (int[] car: CARS) {

            // Busy car
            if (car[3] > 0)
                continue;

            // Check that we can do it on time

            // Car to ride distance
            int carRideDistance = Math.abs(car[1] - ride[0]) + Math.abs(car[2] - ride[1]);

            // Ride start to ride end
            int travel = Math.abs(ride[0] - ride[2]) + Math.abs(ride[1] - ride[3]);

            int distance = carRideDistance + travel;

            // Compute the remaining time to do it
            int timeRemaining = ride[5] - STEP;

            // We can do it
            if (timeRemaining >= distance)
                possibilities.add(car[0]);

            i++;
        }

        return possibilities;
    }



    /*
        Function used to take a ride
        ARGUMENTS:  ride index
                    car index
     */
    static void takeRide(int rideIndex, int carIndex) {

        // Check that it is not null
        if (RESULTS[carIndex+1] == null)
            RESULTS[carIndex+1] = new ArrayList<>();

        // Add to the result
        RESULTS[carIndex+1].add(RIDES.get(rideIndex)[6]);

        // Update the Car
        CARS.get(carIndex)[3] = timeTaken(CARS.get(carIndex), RIDES.get(rideIndex));
        CARS.get(carIndex)[1] = RIDES.get(rideIndex)[2];
        CARS.get(carIndex)[2] = RIDES.get(rideIndex)[3];

        // Remove ride
        RIDES.remove(rideIndex);
    }



    /*
        Function used to compute the time taken
        ARGUMENTS:  car data
                    ride data
        RETURNS:    total time
     */
    static int timeTaken(int[] car, int[] ride) {

        // Car to ride distance
        int carRideDistance = Math.abs(car[1] - ride[0]) + Math.abs(car[2] - ride[1]);

        // Ride start to ride end
        int travel = Math.abs(ride[0] - ride[2]) + Math.abs(ride[1] - ride[3]);

        int distance = carRideDistance + travel;

        if (STEP + carRideDistance < ride[5])
            distance += ride[4] - (STEP + carRideDistance);

        return distance;
    }
}
