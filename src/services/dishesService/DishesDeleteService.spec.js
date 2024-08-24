// importing my logic service
const DishesDeleteService = require('./DishesDeleteService');
const DishesRepositoryInMemory = require('../../databaseRepositories/DishesRepositoryInMemory');
const DiskStorage = require('../../providers/DiskStorage');

// Mock do DiskStorage
jest.mock('../../providers/DiskStorage');

// declaring my group tests
describe('DishesDeleteService', () => {
    // declaring my variables to all tests
    let dishesRepositoryInMemory;
    let dishesDeleteService;
    let diskStorageMock;

    // for each test, create a new instance
    beforeEach(() => {
        // instance of services and repositories
        dishesRepositoryInMemory = new DishesRepositoryInMemory();
        dishesDeleteService = new DishesDeleteService(dishesRepositoryInMemory);

        // create the mock do DiskStorage
        diskStorageMock = new DiskStorage();
        diskStorageMock.deleteFile = jest.fn(); // Mock of function deleteFile
        DiskStorage.mockImplementation(() => diskStorageMock); // use the mock instead of the real implementation
    });

    it('should delete a dish by id', async () => {
        // executing the service to delete a dish
       const response =  await dishesDeleteService.execute(1);
        
       // expect that the response does not contain the same id as the one that was deleted
        expect(response).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 1 })
            ])
        )
        
        expect(diskStorageMock.deleteFile).toHaveBeenCalledWith('path/to/image.png')
    })
})

